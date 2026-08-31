from bs4 import BeautifulSoup


class ArticleParser:

    def parse(self, html):

        soup = BeautifulSoup(html, "html.parser")

        for tag in soup(
            [
                "script",
                "style",
                "nav",
                "footer",
                "header",
                "aside"
            ]
        ):
            tag.decompose()

        paragraphs = soup.find_all("p")

        article = []

        for p in paragraphs:

            text = p.get_text(
                separator=" ",
                strip=True
            )

            if len(text) > 40:
                article.append(text)

        return "\n".join(article)