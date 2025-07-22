# import csv
# import json

# # Path to your input CSV file
# csv_file_path = 'D:\ddu\sem6\sdp\mm\Movie_Recommendation-API-main\cleaned_movie_dataset.csv'

# # Path to your output JSON file
# json_file_path = 'D:\ddu\sem6\sdp\mm\Movie_Recommendation-API-main\output.json'

# # Open the CSV file and read its content
# with open(csv_file_path, mode='r', encoding='utf-8') as file:
#     csv_reader = csv.DictReader(file)  # Use DictReader to read rows as dictionaries
    
#     # List to store the extracted data
#     extracted_data = []

#     # Loop through each row in the CSV
#     for row in csv_reader:
#         # Extract the relevant fields (id, title, genres, cast)
#         data = {
#             'id': row['id'],
#             'title': row['title'],
#             'genres': row['genres'],
#             'cast': row['cast']
#         }
#         extracted_data.append(data)

# # Write the extracted data to a JSON file
# with open(json_file_path, mode='w', encoding='utf-8') as json_file:
#     json.dump(extracted_data, json_file, indent=4)

# print(f"Data has been successfully extracted and saved to {json_file_path}")



import csv
import json

# Path to your input CSV file
csv_file_path = 'D:\ddu\sem6\sdp\mm\Movie_Recommendation-API-main\cleaned_movie_dataset.csv'

# # Path to your output JSON file
json_file_path = 'D:\ddu\sem6\sdp\mm\Movie_Recommendation-API-main\output.json'

# Open the CSV file and read its content
with open(csv_file_path, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)  # Use DictReader to read rows as dictionaries
    
    # List to store the extracted data
    extracted_data = []

    # Loop through each row in the CSV
    for row in csv_reader:
        # Extract the relevant fields (id, title, genres, cast, and overview)
        genres = row['genres'].split()  # Split the genres string into a list
        cast = row['cast'].split()  # Split the cast string into a list
        
        # Prepare the data for each row
        data = {
            # 'id': row['id'],
            'title': row['popularity'],
            'description': row['overview'],  # Rename 'overview' to 'description'
            'genre': cast,  # Genres as list of strings
            'cast': [{'name': actor, 'photo': ""} for actor in cast],  # Cast with empty photo URLs
            'releaseYear': 2000,
            'poster': "https://static.vecteezy.com/system/resources/previews/031/974/996/large_2x/modern-illustration-of-404-error-page-template-for-website-electric-plug-and-socket-unplugged-concept-of-electrical-theme-web-banner-disconnection-loss-of-connect-yellow-vector.jpg",
            'cast':[],
            'likes': [], 
        }
        
        # Append the processed data to the list
        extracted_data.append(data)

# Write the extracted data to a JSON file
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(extracted_data, json_file, indent=4)

print(f"Data has been successfully extracted and saved to {json_file_path}")
# # Default poster URL
# default_poster_url = "https://static.vecteezy.com/system/resources/previews/031/974/996/large_2x/modern-illustration-of-404-error-page-template-for-website-electric-plug-and-socket-unplugged-concept-of-electrical-theme-web-banner-disconnection-loss-of-connect-yellow-vector.jpg"

# # Open the CSV file and read its content
# with open(csv_file_path, mode='r', encoding='utf-8') as file:
#     csv_reader = csv.DictReader(file)  # Use DictReader to read rows as dictionaries
    
#     # List to store the extended data
#     extended_data = []

#     # Loop through each row in the CSV
#     for row in csv_reader:
#         # Extract required fields
#         genres = row['genres'].split()  # Splitting genres string into a list
#         cast = row['cast'].split()  # Splitting cast string into a list
        
#         # Assuming empty values for the fields not provided (description, releaseYear, likes)
#         data = {
#             'id': row['id'],
#             'title': row['title'],
#             'description': "",  # Empty description, you can add actual data if available
#             'genre': genres,  # Genres as list of strings
#             'releaseYear': 2000,  # You can assume any year or leave as 0 if no data is provided
#             'poster': default_poster_url,  # Default poster URL
#             'cast': [{'name': actor, 'photo': ""} for actor in cast],  # Cast with empty photos
#             'likes': []  # Empty array for likes
#         }
#         extended_data.append(data)

# # Write the extended data to a JSON file
# with open(json_file_path, mode='w', encoding='utf-8') as json_file:
#     json.dump(extended_data, json_file, indent=4)

# print(f"Data has been successfully extended and saved to {json_file_path}")
