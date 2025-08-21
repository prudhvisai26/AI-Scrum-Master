from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load your .env variables
load_dotenv()

# Initialize FastAPI app
app=FastAPI()

# Set your OpenAI API key from the environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Pydantic model for incoming request body
class SummaryRequest(BaseModel):
    updates:str
    user:str


# POST route to summarize standup update
@app.post("/summary")
async def generate_summary(data:SummaryRequest):
    print(data)
    # Create a prompt for GPT
    prompt = f"Summarize the following standup update for {data.user} in 2-3 bullet points:\n{data.updates}"

    try:
        # Call OpenAI GPT-3.5 Turbo
        response=client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        #Extract summary from response
        summary=response.choices[0].message.content
        print(summary)

        return {"summary":summary}
    
    except Exception as e:
        return {"error":str(e)} 

@app.get("/")
def root():
    return {"message": "Hello World"}   