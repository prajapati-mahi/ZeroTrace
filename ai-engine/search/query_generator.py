import re


class QueryGenerator:

    def generate(self, text: str, max_queries: int = 10):

        # Clean text
        text = re.sub(r"\s+", " ", text).strip()

        # Split into sentences
        sentences = re.split(r"[.!?]", text)

        queries = []

        for sentence in sentences:

            sentence = sentence.strip()

            if len(sentence) < 30:
                continue

            queries.append(sentence)

            if len(queries) >= max_queries:
                break

        return queries