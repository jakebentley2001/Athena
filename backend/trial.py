import re
import json
from openai import OpenAI
import os

api_key = os.getenv("OPENAI_KEY")
client = OpenAI(api_key=api_key)

topic = "CNNs"

text = """
Below is a staged reading list and roadmap to help you learn about Reinforcement Learning from Human Feedback (RLHF). It progresses from broad overviews to more specialized and advanced work. I’ve included short notes on why each paper/resource is relevant and how it fits into the bigger picture.

## 1. **Foundational and Overview Works**
1. **"Deep Reinforcement Learning from Human Preferences"**  
   *Christiano et al., 2017*  
   **Why Read?**  
   - Introduces the concept of learning policies based on human feedback.  
   - Provides foundational methods for incorporating human preferences into reinforcement learning frameworks.  
   - Sets the stage for understanding the importance of human feedback in AI agent learning.

2. **"A Survey on Learning from Human Feedback"**  
   *MacGlashan et al., 2017*  
   **Why Read?**  
   - Offers a comprehensive review of methods and techniques in learning from human feedback.  
   - Discusses the challenges and future directions in this area of research.  
   - Provides context for the applications of RLHF across various domains.

3. **"Scaling Laws for Neural Language Models"**  
   *Kaplan et al., 2020*  
   **Why Read?**  
   - Discusses how scaling models impacts their performance in tasks influenced by human feedback.  
   - Highlights the connection between model size and the effectiveness of RLHF techniques.  
   - Sets a broader context for understanding the interplay between model architectures and learning from human feedback.

---

## 2. **Core Techniques or Key Methods**
4. **"Preference-Based Reinforcement Learning: A Review"**  
   *Marino et al., 2020*  
   **Why Read?**  
   - Provides a detailed analysis of preference-based methods in RL.  
   - Defines several key techniques for integrating human feedback into reinforcement learning.  
   - Clarifies the trade-offs and benefits of various approaches.

5. **"Learning from Human Preferences"**  
   *Stiennon et al., 2020*  
   **Why Read?**  
   - Focuses on practical implementations of human preference feedback in training models.  
   - Offers case studies on applications of these methods in real-world scenarios.  
   - Explores outcomes and effectiveness of RLHF strategies in language models.

---

## 3. **Important Subtopics / Subfields**
6. **"Incorporating Human Feedback in Reinforcement Learning"**  
   *Warnell et al., 2018*  
   **Why Read?**  
   - Examines ways to leverage human feedback for training reinforcement learning agents.  
   - Discusses the dynamics between human input and agent decision-making processes.  
   - Offers insights into challenges faced in tuning agents based on varying human feedback.

7. **"Interactive Learning from Policy Dependent Human Feedback"**  
   *Knox and Stone, 2008*  
   **Why Read?**  
   - Early work highlighting the influence of an agent's policy on human feedback.  
   - Introduces interaction models that adaptively integrate human guidance.  
   - Lays groundwork for more complex interactions in RLHF applications.

---

## 4. **Advanced Topics and Ongoing Research**
8. **"AI Alignment: Why It’s Hard and Where to Start"**  
   *Paul Christiano, 2020*  
   **Why Read?**  
   - Explores critical issues in aligning AI systems with human values through RLHF.  
   - Discusses potential safety concerns and ethical implications surrounding human feedback.  
   - Offers a forward-looking perspective on the intersection of RLHF and alignment research.

9. **"Learning Goals from Human Feedback"**  
   *Reddy et al., 2021*  
   **Why Read?**  
   - Investigates advanced strategies for extracting nuanced goals from human interactions.  
   - Proposes methods for improving the interpretation of human feedback in goal-oriented settings.  
   - Shows promising areas of exploration for improving RLHF frameworks.
   
   """

def get_text(topic:str):


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
    print("HELLLLLLLLLLLLOOOOOOO")
    raw_text = final_response

    return raw_text


def parse_text_to_dict(text: str) -> dict:
    """
    Parses the given text and returns a dictionary with
    4 categories, each containing exactly 2 papers.
    Each paper has:
      - title
      - authors
      - bullet_points (list of bullet points)
    """

    # 1) Regex to find all category blocks (category_num, category_name, content)
    #    We'll match lines like: '## 1. **Foundational and Overview Works**'
    #    Then capture everything until the next '## X.' or end-of-string.
    # r'##\s*(\d+)\.\s*\*\*(.*?)\*\*\s*(.*?)\n(?=##|\Z)', 
    category_pattern = re.compile(
        r'##\s*(\d+)\.\s*\*\*(.*?)\*\*\s*(.*?)\n(?=##|---|\Z)',
        re.DOTALL
    )
    
    # 2) Regex to find each paper item within a category’s text
    #    We'll look for lines like:
    #         '1. **"Deep Reinforcement Learning from Human Preferences"**\n   *Christiano et al., 2017*'
    #    Followed by "**Why Read?**" and bullet points.
    paper_pattern = re.compile(
        r'''
        ^\d+\.\s*\*\*"       # Number + dot + **" (start)
        (?P<title>[^"]+)"\*\*  # Capture everything until the next quote
        \s*\n\s*\*(?P<authors>[^*]+)\*.*?Why\s+Read\?\*\*  # Next line with *Authors*, then "Why Read?"
        (?P<bullets>.*?)      # Capture the bullet section up to next item or end
        (?=\n\d+\.\s*\*\*|---|\Z)  # Look ahead for next item or end
        ''',
        re.DOTALL | re.VERBOSE | re.MULTILINE
    )
    
    # 3) Regex to capture bullet lines: lines starting with "-"
    bullet_pattern = re.compile(r'-\s+(.*)')
    
    # Prepare the final dictionary structure
    final_dict = {}
    
    # Find all category blocks
    categories = category_pattern.findall(text)
    # print("JAJJJJJJKKKKKKKKEEEEEEEEE")
    # print(categories)
    # print("JAJJJJJJKKKKKKKKEEEEEEEEE")
    # Each match is a tuple: (category_number, category_name, content_block)
    
    # We want exactly 4 categories. 
    # If the text had more, you might slice, but here we assume exactly 4.
    for cat_num_str, cat_name, cat_content in categories[:4]:
        cat_num = int(cat_num_str.strip())
        
        # Find all papers in this category block
        papers_in_cat = []
        for p_match in paper_pattern.finditer(cat_content):
            title = p_match.group('title').strip()
            authors = p_match.group('authors').strip()
            bullets_block = p_match.group('bullets')
            
            # Extract bullet lines
            bullet_points = bullet_pattern.findall(bullets_block)
            bullet_points = [bp.strip() for bp in bullet_points]
            
            paper_info = {
                "title": title,
                "authors": authors,
                "bullet_points": bullet_points
            }
            papers_in_cat.append(paper_info)
        
        # Keep only the first 2 papers (as requested)
        final_dict[cat_name.strip()] = {
            "papers": papers_in_cat
        }
    
    return final_dict


def get_papers_from_topic_2(topic):
    text = get_text(topic)
    result = parse_text_to_dict(text)
    print(result)
    return result

if __name__ == "__main__":
    text = get_text(topic)
    result = parse_text_to_dict(text)
    print(json.dumps(result, indent = 2))