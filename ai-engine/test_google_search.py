from search.google_search import GoogleSearch

google = GoogleSearch()

results = google.search(
    "Artificial Intelligence plagiarism detection"
)

for r in results:
    print(r)