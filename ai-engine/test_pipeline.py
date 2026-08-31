from search.search_pipeline import SearchPipeline


text = """
Machine Learning is transforming healthcare.

Artificial Intelligence improves diagnosis.

Deep Learning is a branch of Machine Learning.
"""


pipeline = SearchPipeline()

articles = pipeline.search(text)

print()

print("=" * 100)

print()

print("TOTAL ARTICLES:", len(articles))

print()

for article in articles:

    print(article["title"])

    print(article["url"])

    print(article["content"][:400])

    print()

    print("=" * 100)