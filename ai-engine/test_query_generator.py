from search.query_generator import QueryGenerator


text = """
Machine Learning is transforming healthcare.
Artificial Intelligence improves diagnosis.
Deep Learning is a branch of Machine Learning.
Natural Language Processing is used in chatbots.
"""


generator = QueryGenerator()

queries = generator.generate(text)

for i, query in enumerate(queries, start=1):
    print(f"{i}. {query}")