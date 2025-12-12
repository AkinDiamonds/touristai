from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.schema import Document as LlamaDocument

with open("Cleaned_Tourist.txt", "r", encoding="utf-8") as f:
    main_doc = f.read()

main_doc_llama = LlamaDocument(text=main_doc)

splitter = SentenceSplitter(
    chunk_size=700,
    chunk_overlap=120,
)

chunks = splitter.get_nodes_from_documents([main_doc_llama])

print(chunks)
