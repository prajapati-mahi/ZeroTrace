from fastapi import APIRouter
from pydantic import BaseModel

from services.embedding_service import EmbeddingService
from services.search_service import SearchService

from utils.sentence_splitter import split_sentences
from utils.chunk_generator import generate_chunks

from storage.faiss_store import faiss_store


router = APIRouter()

embedding_service = EmbeddingService()
search_service = SearchService(faiss_store)


class TextRequest(BaseModel):
    text: str


class SearchRequest(BaseModel):
    text: str


@router.get("/health")
def health():
    return {
        "status": "healthy"
    }


@router.post("/embed")
def embed(request: TextRequest):

    sentences = split_sentences(request.text)

    chunks = generate_chunks(sentences)

    embeddings = embedding_service.encode(chunks)

    # Reset FAISS before adding new document
    faiss_store.clear()

    # Store all embeddings
    faiss_store.add(embeddings)

    return {

        "total_sentences": len(sentences),

        "total_chunks": len(chunks),

        "stored_vectors": faiss_store.total_vectors(),

        "chunks": chunks,

        "embeddings": embeddings

    }


@router.get("/vectors")
def vectors():

    return {

        "total_vectors": faiss_store.total_vectors()

    }


@router.post("/search")
def search(request: SearchRequest):

    sentences = split_sentences(request.text)

    chunks = generate_chunks(sentences)

    embeddings = embedding_service.encode(chunks)

    if len(embeddings) == 0:

        return {
            "results": []
        }

    query_vector = embeddings[0]["vector"]

    results = search_service.search(
        query_vector,
        top_k=5
    )

    return {

        "results": results

    }