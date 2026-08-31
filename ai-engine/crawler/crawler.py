from crawler.scraper import WebScraper
from crawler.parser import ArticleParser


class Crawler:

    def __init__(self):

        self.scraper = WebScraper()
        self.parser = ArticleParser()

    def crawl(self, url):

        html = self.scraper.scrape(url)

        article = self.parser.parse(html)

        return article