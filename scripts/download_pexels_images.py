import os
import requests
from time import sleep

# Reemplaza esto con tu API key de Pexels
API_KEY = 'Wryy8ixEbDFM5dzmeDGKO8lrqq9397gzu76oBJJ0MF2ttw1MJ4OLNilG'

# Configuración de destinos y sus términos de búsqueda
DESTINATIONS = {
    'paris': ['eiffel tower paris', 'louvre museum', 'notre dame cathedral'],
    'santorini': ['santorini blue domes', 'santorini sunset', 'santorini beach'],
    'colosseum': ['roman colosseum', 'roman forum', 'palatine hill'],
    'sagrada-familia': ['sagrada familia barcelona', 'park guell', 'barcelona gothic quarter'],
    'alhambra': ['alhambra granada', 'generalife gardens', 'court of lions'],
    'taj-mahal': ['taj mahal agra', 'agra fort', 'fatehpur sikri'],
    'great-wall': ['great wall china', 'forbidden city beijing', 'summer palace'],
    'petra': ['petra treasury', 'petra monastery', 'siq petra'],
    'machu-picchu': ['machu picchu ruins', 'huayna picchu', 'inca trail'],
    'grand-canyon': ['grand canyon sunset', 'grand canyon river', 'grand canyon skywalk'],
    'pyramids': ['giza pyramids', 'sphinx egypt', 'valley of kings'],
    'victoria-falls': ['victoria falls aerial', 'victoria falls rainbow', 'zambezi river'],
    'sydney-opera': ['sydney opera house', 'sydney harbour bridge', 'circular quay'],
    'uluru': ['uluru sunset', 'kata tjuta', 'uluru base walk']
}

headers = {
    'Authorization': API_KEY
}

def download_image(url, destination_path):
    response = requests.get(url)
    if response.status_code == 200:
        os.makedirs(os.path.dirname(destination_path), exist_ok=True)
        with open(destination_path, 'wb') as f:
            f.write(response.content)
        return True
    return False

def get_pexels_photos(query):
    url = f'https://api.pexels.com/v1/search?query={query}&per_page=1'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        if data['photos']:
            return data['photos'][0]['src']['large2x']
    return None

def main():
    base_dir = 'public/images/default'
    
    for dest, queries in DESTINATIONS.items():
        print(f"\nProcessing {dest}...")
        dest_dir = os.path.join(base_dir, dest)
        
        # Descargar imagen principal
        main_url = get_pexels_photos(queries[0])
        if main_url:
            print(f"Downloading main image for {dest}")
            download_image(main_url, os.path.join(dest_dir, 'main.jpg'))
        
        # Descargar imágenes relacionadas
        for i, query in enumerate(queries, 1):
            if i > 3:  # Solo necesitamos 3 imágenes relacionadas
                break
            url = get_pexels_photos(query)
            if url:
                print(f"Downloading related image {i} for {dest}")
                download_image(url, os.path.join(dest_dir, f'{i}.jpg'))
            sleep(0.5)  # Evitar límites de rate

if __name__ == '__main__':
    main()
