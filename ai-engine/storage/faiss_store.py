import faiss
import numpy as np


class FaissStore:

    def __init__(self):
        self.dimension = 384
        self.index = faiss.IndexFlatIP(self.dimension)
        self.metadata = []

    def add(self, embeddings):
        if len(embeddings) == 0:
            return

        vectors = np.array(
            [e["vector"] for e in embeddings],
            dtype=np.float32
        )

        self.index.add(vectors)
        self.metadata.extend(embeddings)

    def search(self, query_vector, k=5):

        if self.index.ntotal == 0:
            return []

        query = np.array(
            [query_vector],
            dtype=np.float32
        )

        scores, indices = self.index.search(query, k)

        results = []

        for score, idx in zip(scores[0], indices[0]):

            if idx == -1:
                continue

            results.append({
                "score": float(score),
                "chunk": self.metadata[idx]
            })

        return results

    def total_vectors(self):
        return self.index.ntotal

    def clear(self):
        self.index = faiss.IndexFlatIP(self.dimension)
        self.metadata = []


faiss_store = FaissStore()