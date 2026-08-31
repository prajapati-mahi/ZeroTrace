from unittest import result

from search.query_generator import QueryGenerator
from search.google_search import GoogleSearch

from crawler.crawler import Crawler


class SearchPipeline:

    def __init__(self):

        self.query_generator = QueryGenerator()

        self.google = GoogleSearch()

        self.crawler = Crawler()

    def search(self, text):

        queries = self.query_generator.generate(text)

        urls = []

        visited = set()

        articles = []

        for query in queries:

            results = self.google.search(query)

            for result in results:

                url = result["url"]

                blocked = ["youtube.com", "youtu.be", "facebook.com", "instagram.com", "linkedin.com", "x.com", "twitter.com", "pinterest.com"]

                if any(site in url.lower() for site in blocked):
                    continue

                if url in visited:
                    continue

                visited.add(url)

                urls.append(result)

        print(f"\nFound {len(urls)} unique URLs\n")

        for result in urls:

            print("Downloading:", result["title"])

            try:
                article = self.crawler.crawl(result["url"])

                if len(article) < 300:
                    continue

                articles.append({
                    "title": result["title"],
                    "url": result["url"],
                    "content": article
                })

            except Exception as e:
                print(f"❌ Skipped: {result['url']}")
                print(f"Reason: {e}")
                continue

        print("\n===================================")
        print(f"Downloaded {len(articles)} usable articles")
        print("===================================\n")
        return articles