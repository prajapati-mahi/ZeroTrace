from crawler.crawler import Crawler

crawler = Crawler()

article = crawler.crawl(
    "https://www.geeksforgeeks.org/introduction-to-arrays-data-structure-and-algorithm-tutorials/"
)

print(article[:3000])