from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse 
from auth_token import auth_token
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch.amp import autocast  # Make sure this is correct
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load stable diffusion model
device = "cuda"
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(
    model_id, revision="fp16", torch_dtype=torch.float16, token=auth_token
)
pipe.to(device)


@app.get("/")
def generate(prompt: str):
    with autocast(device):
        image = pipe(prompt, guidance_scale=8.5).images[0]

    buffer = BytesIO()
    image.save(buffer, format="PNG")
    imgstr = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return JSONResponse(content={
        "image": imgstr,
        "author": "Nguyen Hoang Minh Giang",  # 🔥 Add your name here
        "message": "This app was built by Nguyen Hoang Minh Giang!"
    })


