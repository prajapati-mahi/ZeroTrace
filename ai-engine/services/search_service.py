class SearchService:

    def __init__(self, faiss_store):
        self.faiss_store = faiss_store

    def search(self, query_vector, top_k=5):

        results = self.faiss_store.search(
            query_vector,
            top_k
        )

        formatted = []

        for item in results:

            formatted.append({
                "score": item["score"],
                "chunk_id": item["chunk"]["chunk_id"],
                "text": item["chunk"]["text"]
            })

        return formatted