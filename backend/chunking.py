from openai import OpenAI
import os
import pdfplumber
from PyPDF2 import PdfReader

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

def extract_text_from_pdf(pdf):
    """
    Extracts text from a PDF file.
    :param pdf_path: Path to the PDF file
    :return: The extracted text as a string
    """
    # extracted_text = []
    # try:
    #     with pdfplumber.open(pdf_path) as pdf:
    #         for page in pdf.pages:
    #             extracted_text.append(page.extract_text())
    # except Exception as e:
    #     print(f"Error extracting text from PDF: {e}")
        # return None

    # return "\n".join(extracted_text)
    print("HELLO 1")
    reader = PdfReader(pdf)
    print("HELLO 2")
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

   

def split_text_into_chunks(text, max_tokens=1000):
    """
    Splits text into chunks of maximum token size.
    :param text: The full text to split
    :param max_tokens: Maximum tokens per chunk
    :return: List of text chunks
    """
    sentences = text.split('. ')
    chunks = []
    current_chunk = []

    for sentence in sentences:
        if len(' '.join(current_chunk + [sentence])) <= max_tokens:
            current_chunk.append(sentence)
        else:
            chunks.append(' '.join(current_chunk))
            current_chunk = [sentence]

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks


def generate_chunks(pdf):

    paper_text = extract_text_from_pdf(pdf)

    paper_chunks = split_text_into_chunks(paper_text)

    chunk_embeddings = [
        client.embeddings.create(input=chunk, model="text-embedding-ada-002").data[0].embedding
        for chunk in paper_chunks
    ]

    return paper_chunks, chunk_embeddings