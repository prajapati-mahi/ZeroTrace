from typing import List


def generate_chunks(
    sentences: List[str],
    chunk_size: int = 3,
    overlap: int = 1
):
    """
    Generate overlapping chunks.

    Example:

    S1
    S2
    S3
    S4
    S5

    chunk_size = 3
    overlap = 1

    =>
    Chunk1 = S1 S2 S3
    Chunk2 = S3 S4 S5
    """

    if len(sentences) <= chunk_size:
        return [" ".join(sentences)]

    chunks = []

    step = chunk_size - overlap

    for i in range(0, len(sentences), step):

        chunk = sentences[i:i + chunk_size]

        if len(chunk) < chunk_size:
            break

        chunks.append(" ".join(chunk))

    return chunks