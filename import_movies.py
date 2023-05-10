import pymongo
import requests

# je récupère 140 films pour en avoir quelques un et je les import dans mongodb

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["movie_database"]
collection = db["movies"]
api_key = "XXXXXXXXXX"
url_template = "https://api.themoviedb.org/3/movie/top_rated?api_key={}&language=en-US&page={}"


for page in range(1, 8):
    url = url_template.format(api_key, page)
    response = requests.get(url)
    data = response.json()["results"]
    for movie in data:
        movie_data = {
            "title": movie["title"],
            "poster_path": movie["poster_path"],
            "overview": movie["overview"],
            "release_date": movie["release_date"],
            "vote_average": movie["vote_average"],
            "vote_count": movie["vote_count"]
        }
        collection.insert_one(movie_data)
