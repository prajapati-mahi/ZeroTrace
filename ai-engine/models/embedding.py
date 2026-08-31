# from sentence_transformers import SentenceTransformer

# class EmbeddingService:

#     def __init__(self):
#         print("Loading embedding model...")

#         self.model = SentenceTransformer(
#             "sentence-transformers/all-mpnet-base-v2"
#         )

#         print("Model Loaded Successfully!")

#     def encode(self, sentences):

#         embeddings = self.model.encode(
#             sentences,
#             convert_to_numpy=True,
#             normalize_embeddings=True
#         )

#         return embeddings.tolist()

from sentence_transformers import SentenceTransformer

print("Loading Embedding Model...")

model = SentenceTransformer("all-MiniLM-L6-v2")

print("Embedding Model Loaded Successfully")