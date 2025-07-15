import pandas as pd
# import bson

# Function to convert MongoDB ObjectId to integer
def objectid_to_int(objectid_str):
    # Convert ObjectId string to integer (base 16)
    return int(objectid_str, 16)

# Load the original CSV
df = pd.read_csv('D:\ddu\sem6\sdp\mm\Movie_Recommendation-API-main\gptmm.movies1.csv')

# Create a new DataFrame for the transformed CSV
new_df = pd.DataFrame()

# Convert _id (MongoDB ObjectId) to integer
new_df['id'] = df['_id'].apply(lambda x: objectid_to_int(str(x)))

# Populate the new columns with the desired information
new_df['title'] = df['title']
new_df['popularity'] = ""  # Leave empty for now
new_df['vote_average'] = df['vote_average']
new_df['vote_count'] = df['vote_count']

# Combine genres into one column (assuming genres[0], genres[1], genres[2] exist)
new_df['genres'] = df[['genres[0]', 'genres[1]', 'genres[2]']].apply(lambda x: ', '.join(x.dropna().astype(str)), axis=1)

# Combine cast names into one column (assuming cast[0].name, cast[1].name, cast[2].name exist)
new_df['cast'] = df[['cast[0].name', 'cast[1].name', 'cast[2].name']].apply(lambda x: ', '.join(x.dropna().astype(str)), axis=1)

# Set director, keywords, overview, and tagline as empty
new_df['director'] = ""  # Empty
new_df['keywords'] = ""   # Empty
new_df['overview'] = ""   # Empty
new_df['tagline'] = ""    # Empty

# Save the transformed CSV
new_df.to_csv('D:\ddu\sem6\sdp\mm\Movie_Recommendation-API-main\my.csv', index=False)

print("Transformation complete!")
