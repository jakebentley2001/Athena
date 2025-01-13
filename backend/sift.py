from openai import OpenAI
import os
import re 

api_key = os.getenv("OPENAI_KEY")
client = OpenAI(api_key=api_key)


def get_papers_from_topic(topic):



    prompt = f"""I want to learn about {topic}. Can you give me a roadmap of academic papers that can help me learn about this? I want to first have a general overview but later get down into more specific parts of the topic," 

    I want you to respond with *exactly* the following structure and style (no extra commentary, disclaimers, or text):

    ---
    Below is a staged reading list and roadmap to help you learn about [TOPIC]. It progresses from broad overviews to more specialized and advanced work. I’ve included short notes on why each paper/resource is relevant and how it fits into the bigger picture.

    ## 1. **Foundational and Overview Works**
    1. **"[Paper/Resource 1 Title]"**  
    *Author(s), Year*  
    **Why Read?**  
    - Bullet 1  
    - Bullet 2  
    - Bullet 3

    2. **"[Paper/Resource 2 Title]"**  
    *Author(s), Year*  
    **Why Read?**  
    - Bullet 1  
    - Bullet 2  
    - Bullet 3

    [Repeat for as many “Foundational/Overview” references as needed]

    ---

    ## 2. **Core Techniques or Key Methods**
    3. **"[Paper/Resource Title]"**  
    *Author(s), Year*  
    **Why Read?**  
    - Bullet 1  
    - Bullet 2  
    - Bullet 3

    [Add more as needed]

    ---

    ## 3. **Important Subtopics / Subfields**
    4. **"[Paper/Resource Title]"**  
    *Author(s), Year*  
    **Why Read?**  
    - Bullet 1  
    - Bullet 2  
    - Bullet 3

    [Add more as needed]

    ---

    ## 4. **Advanced Topics and Ongoing Research**
    5. **"[Paper/Resource Title]"**  
    *Author(s), Year*  
    **Why Read?**  
    - Bullet 1  
    - Bullet 2  
    - Bullet 3

    [Include more advanced or emergent subtopics]

    ---"""


    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )


    final_response = response.choices[0].message.content

    print(final_response)

    raw_text = final_response

# 1) Extract the main sections (e.g., "## 1. Foundational and Overview Works")
    sections = re.findall(r"##\s*\d+\.\s*\*\*(.*?)\*\*", raw_text)
    print("=== SECTIONS ===")
    for sec in sections:
        print(sec.strip())

# 2) Extract individual papers/resources along with authors (lines like "**Title**  *Author(s), Year*")
#    We'll do a simpler approach: find lines starting with a digit and capturing the line below it
    papers = re.findall(
        r'(\d+\.\s*\*\*"(.*?)\*\*\s*\n\s*\*(.*?)\*)',
        raw_text,
        re.DOTALL
    )
    raw_text = ""
    print("\n=== PAPERS FOUND ===")
    for full_match, title, authors in papers:
        raw_text += f"Title: {title.strip()}, Authors: {authors.strip()}\n"
        print(f"Title: {title.strip()}, Authors: {authors.strip()}")


    # 3) Extract bullet points under "Why Read?" (lines starting with "-")
    bullets = re.findall(r'^\s*-\s+(.*)', raw_text, re.MULTILINE)
    print("\n=== BULLET POINTS ===")
    for bullet in bullets:
        print(bullet.strip())

    """
    Extract (title, authors) from lines like:
    Title: "Deep Reinforcement Learning from Human Preferences", Authors: Christiano et al., 2017
    """
    # This regex looks for lines that start with "Title:" and captures everything until 'Authors:'
    pattern = r'Title:\s*(.*?)",\s*Authors:\s*(.*?)\n'
    matches = re.findall(pattern, raw_text)

    papers = []
    for match in matches:
        title, authors = match
        title = title.strip()
        authors = authors.strip()

        # For now, let's add a mock URL or build one dynamically
        # e.g., from the title or a known repository
        url = f"https://example.com/papers/{title.replace(' ', '_')}"
        
        papers.append({
            "title": title,
            "authors": authors,
            "url": url
        })
    
    return papers

