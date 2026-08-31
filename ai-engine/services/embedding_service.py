from models.embedding import model


class EmbeddingService:

    def encode(self, chunks):

        vectors = model.encode(
            chunks,
            convert_to_numpy=True,
            normalize_embeddings=True
        )

        embeddings = []

        for i, vector in enumerate(vectors):

            embeddings.append({

                "chunk_id": i,

                "text": chunks[i],

                "vector": vector.tolist()

            })

        return embeddings