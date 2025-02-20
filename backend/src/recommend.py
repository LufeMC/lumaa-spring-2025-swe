import sys
import json
import pandas as pd
import psycopg2
import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

# Text cleaning function
def clean_text(text):
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    text = " ".join(word for word in text.split() if word not in stop_words)
    return text

# PostgreSQL connection
conn = psycopg2.connect(
    dbname="Movies",
    user="postgres",
    password="1234",
    host="localhost",
    port="5432"
)

query_input = sys.argv[1]

# Load relevant columns from the database
df = pd.read_sql("""
    SELECT title, overview, genres, tagline, keywords
    FROM movie_data
""", conn)
conn.close()

# Fill missing values
for col in ['overview', 'genres', 'tagline', 'keywords']:
    df[col] = df[col].fillna('')

# Combine features into a single string
df['combined_features'] = df.apply(
    lambda row: f"{row['title']} {row['overview']} {row['genres']} {row['tagline']} {row['keywords']}", axis=1
)

# Clean the combined text
df['cleaned_features'] = df['combined_features'].apply(clean_text)

# TF-IDF Vectorization with bigrams and trigrams
vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 3), max_features=5000)
tfidf_matrix = vectorizer.fit_transform(df['cleaned_features'])

# Process the input query similarly
query_cleaned = clean_text(query_input)
query_vector = vectorizer.transform([query_cleaned])

# Compute similarity and get top 5 matches
cosine_sim = cosine_similarity(query_vector, tfidf_matrix).flatten()
top_indices = cosine_sim.argsort()[-5:][::-1]

# Prepare recommendations
recommendations = df.iloc[top_indices][['title', 'overview']].to_dict(orient='records')

# Output recommendations
print(json.dumps(recommendations))
