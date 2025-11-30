import os
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

def get_chain():
    model_name = os.getenv("MODEL_NAME", "phi")

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a Helpful Assistant. Please Respond to the Queries of human."),
        ("human", "Question => {question}")
    ])

    llm = OllamaLLM(model=model_name)
    
    output_parser = StrOutputParser()

    chain = prompt|llm|output_parser

    return chain