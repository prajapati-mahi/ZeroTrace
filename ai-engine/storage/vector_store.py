class VectorStore:

    def __init__(self):
        self.vectors = []

    def add(self, embedding):
        self.vectors.append(embedding)

    def get_all(self):
        return self.vectors

    def clear(self):
        self.vectors = []