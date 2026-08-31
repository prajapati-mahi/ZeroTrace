import os
import requests
from dotenv import load_dotenv

load_dotenv()


class GoogleSearch:

    def __init__(self):
        self.api_key = os.getenv("SERPER_API_KEY")
        self.url = "https://google.serper.dev/search"

    def search(self, query, num_results=10):

        headers = {
            "X-API-KEY": self.api_key,
            "Content-Type": "application/json"
        }

        payload = {
            "q": query,
            "num": num_results
        }

        response = requests.post(
            self.url,
            json=payload,
            headers=headers
        )

        response.raise_for_status()

        data = response.json()

        results = []

        for item in data.get("organic", []):

            results.append({
                "title": item.get("title", ""),
                "url": item.get("link", ""),
                "snippet": item.get("snippet", "")
            })

        return results