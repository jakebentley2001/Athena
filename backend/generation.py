from openai import OpenAI
import os

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

def get_most_relevant_chunk(question, chunks, chunk_embeddings):
    """
    Finds the most relevant chunk for a question using OpenAI embeddings.
    :param question: The question to ask
    :param chunks: List of text chunks
    :return: The most relevant chunk
    """
    # Generate embeddings for the question and chunks
        # Generate embeddings for the question and chunks
    question_embedding = client.embeddings.create(
        input=question, model="text-embedding-ada-002"
    ).data[0].embedding

    # Compute cosine similarity
    def cosine_similarity(vec1, vec2):
        return sum(a * b for a, b in zip(vec1, vec2)) / (
            (sum(a * a for a in vec1) ** 0.5) * (sum(b * b for b in vec2) ** 0.5)
        )

    similarities = [cosine_similarity(question_embedding, chunk_embedding) for chunk_embedding in chunk_embeddings]
    most_relevant_index = similarities.index(max(similarities))

    print("FINISHED GETTING RELEVANT INFO")

    return chunks[most_relevant_index]


def generate_response(question, paper_chunks, chunk_embeddings, color):

    context = get_most_relevant_chunk(question, paper_chunks, chunk_embeddings)


    prompt_green = f"""
        Context: {context}

        Task: Explain this in depth highlighting key understandings I need to have: {question}

        Answer:
        """
    
    prompt_blue = f"""
        Context: {context}

        Task: Quickly explain what this text means: {question}

        Answer:
        """
    
    prompt_red = f"""
        Context: {context}

        Task: Answer this question: {question}

        Answer:
        """
    
    if color == 'green':
        prompt = prompt_green
    elif color == 'blue':
        prompt = prompt_blue
    elif color == 'red':
        prompt = prompt_red
    else:
        prompt = 'Hi How are you'

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": prompt}]
    )

    final_response = response.choices[0].message.content

    return final_response