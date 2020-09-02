#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
import smtplib
import os
import sys
import json
import re
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed


class Apartament:
    def __init__(self, apartament_id, place, description, price, area, price_per_m, rooms, offer_url, source, start_dttm=str(datetime.now()), end_dttm="2030-12-31 23:59:59.9999"):
        self.apartament_id = apartament_id
        self.place = place
        self.description = description
        self.price = price
        self.area = area
        self.price_per_m = price_per_m
        self.rooms = rooms
        self.offer_url = offer_url
        self.source = source
        self.start_dttm = start_dttm
        self.end_dttm = end_dttm

    def print_apartament_info(self):
        print("Numer oferty: " + self.apartament_id)
        print("Miejsce: " + self.place)
        print("Opis: " + self.description)
        print("Cena: " + str(self.price))
        print("Metraż: " + str(self.area))
        print("Cena/m^2: " + str(self.pricePerM))
        print("Liczba pokoi: " + self.rooms)
        print("Link do oferty: " + self.offerUrl)
        print("Portal: " + self.source)
        print("\n")

    def print_apartament_str(self):
        return "Numer oferty: " + self.apartament_id + "\n" + "Miejsce: " + self.place + "\n" + "Opis: " + self.description + "\n" + "Cena: " + str(self.price) + "\n" + "Metraż: " + str(self.area) + "\n" + "Cena/m^2: " + str(self.price_per_m) + "\n" + "Liczba pokoi: " + self.rooms + "\n" + "Link do oferty: " + self.offer_url + "\n" + "Portal: " + self.source + "\n\n\n"

    @classmethod
    def from_json(cls, json_string):
        y = json.dumps(json_string)
        json_dict = json.loads(y)
        return cls(**json_dict)


def send_email(email_from, email_to, password, message, subject):
    text = 'Subject: {}\n\n{}'.format(subject, message).encode('utf-8')
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email_from, password)
    print("Login success.")
    server.sendmail(email_from, email_to, text)
    print("Email has been sent.")


def get_otodom_data():

    url = "https://www.otodom.pl/sprzedaz/mieszkanie/?search%5Bfilter_float_price%3Ato%5D=400000&search%5Bfilter_float_m%3Afrom%5D=40&locations%5B0%5D%5Bcity_id%5D=26&locations%5B0%5D%5Bdistrict_id%5D=117&locations%5B0%5D%5Bstreet_id%5D=0&locations%5B1%5D%5Bregion_id%5D=7&locations%5B1%5D%5Bsubregion_id%5D=197&locations%5B1%5D%5Bcity_id%5D=26&locations%5B1%5D%5Bdistrict_id%5D=36&locations%5B2%5D%5Bregion_id%5D=7&locations%5B2%5D%5Bsubregion_id%5D=197&locations%5B2%5D%5Bcity_id%5D=26&locations%5B2%5D%5Bdistrict_id%5D=53&locations%5B3%5D%5Bregion_id%5D=7&locations%5B3%5D%5Bsubregion_id%5D=197&locations%5B3%5D%5Bcity_id%5D=26&locations%5B3%5D%5Bdistrict_id%5D=38"
    result = requests.get(url)

    res = result.content
    soup = BeautifulSoup(res, "html.parser")
    mydivs = soup.findAll("div", {"class": "offer-item-details"})
    for div in mydivs:
        place = div.find('p', class_='text-nowrap').text
        description = div.find('span', class_='offer-item-title').text

        price = div.find('li', class_='offer-item-price').text
        area = div.find('li', class_='hidden-xs offer-item-area').text
        pricePerM = div.find(
            'li', class_='hidden-xs offer-item-price-per-m').text
        rooms = div.find('li', class_='offer-item-rooms hidden-xs').text
        offerUrl = div.find('a')['href']
        id = re.search('ID[A-Za-z0-9]+', offerUrl).group(0)

        price = price.strip().replace("zł", "").replace(" ", "").replace(",", ".")
        pricePerM = pricePerM.replace(
            "zł/m²", "").replace(" ", "").replace(",", ".")
        area = area.replace(" m²", "").replace(",", ".")
        source = "www.otodom.pl"
        apartament = Apartament(id, place[24:], description, float(
            price), float(area), float(pricePerM), rooms, offerUrl, source)

        apartaments.append(apartament)


def get_district_number(district):
    if district == 'wola':
        district_num = 'v1c9073l3200025'
    elif district == 'bemowo':
        district_num = 'v1c9073l3200009'
    elif district == 'bielany':
        district_num = 'v1c9073l3200011'
    elif district == 'zoliborz':
        district_num = 'v1c9073l3200026'
    return district_num


def run_gumtree_data(url_list):
    threads = []
    with ThreadPoolExecutor(max_workers=20) as executor:
        for url in url_list:
            res = threads.append(executor.submit(
                get_gumtree_data, url))


def get_gumtree_data(district):
    try:
        district_num = get_district_number(district)
        url = "https://www.gumtree.pl/s-mieszkania-i-domy-sprzedam-i-kupie/{district}/{district_num}p{page_num}?pr=,400000&nr=2".format(
            page_num=1, district=district, district_num=district_num)
        result = requests.get(url)

        res = result.content
        soup = BeautifulSoup(res, "html.parser")
        max_page = len(soup.findAll("a", {"class": "pag-box"}))
        if max_page == 0:
            max_page = 1

        for i in range(0, max_page):
            print("Page: " + str(i+1))
            url = "https://www.gumtree.pl/s-mieszkania-i-domy-sprzedam-i-kupie/{district}/{district_num}p{page_num}?pr=,400000&nr=2".format(
                page_num=i+1, district=district, district_num=district_num)
            result = requests.get(url)

            res = result.content
            soup = BeautifulSoup(res, "html.parser")
            max_page = len(soup.findAll("a", {"class": "pag-box"}))
            mydivs = soup.findAll("div", {"class": "tileV1"})

            for div in mydivs:
                title = div.find('div', class_='title').text
                offerUrl = div.find(
                    'a', class_='href-link tile-title-text')['href']
                offerUrl = 'https://www.gumtree.pl' + offerUrl
                id = div.find('div', class_='addAdTofav')['data-short-id']
                price = div.find('span', class_='ad-price').text
                price = price.replace(" ", "").replace(
                    "zł", "").replace("\t", "").replace("\s", "")
                price = "".join(price.split())
                result = requests.get(offerUrl)
                res = result.content
                soup = BeautifulSoup(res, "html.parser")
                attributes = soup.findAll("div", {"class": "attribute"})
                for attribute in attributes:
                    name = (attribute.find("span", {"class": "name"})).text
                    if name == "Lokalizacja":
                        place = attribute.find("span", {"class": "value"}).text
                    elif name == "Wielkość (m2)":
                        area = attribute.find("span", {"class": "value"}).text
                    elif name == "Liczba pokoi":
                        rooms = attribute.find("span", {"class": "value"}).text

                pricePerM = float(price)/float(area)
                source = "www.gumtree.pl"

                if(float(area) > 40.0):
                    apartament = Apartament(id, place, title, float(price), float(
                        area), float(pricePerM), rooms, offerUrl, source)
                    apartaments.append(apartament)

    except requests.exceptions.RequestException as e:
        print("WRONG" + district)
        return e


def save_apartaments(url_api, url_list):
    payload = '{"apartaments": ['
    for ap in apartaments:
        json_string = json.dumps(ap.__dict__, sort_keys=True,
                                 indent=2, ensure_ascii=True)
        payload = payload + json_string + ","

    payload = payload[:-1] + "]}"

    headers = {'Content-Type': 'application/json'}

    print(payload)
    response = requests.request("PUT", url_api, headers=headers, data=payload)
    print(response.status_code)
    # new_apartaments = response.json()
    # new_apartaments_list = list()

    return new_apartaments["new_apartaments_list"]


def main():

    url_api = "http://127.0.0.1:8000/apartament"
    url_list = ['zoliborz', 'bielany', 'wola', 'bemowo']

    get_otodom_data()
    run_gumtree_data(url_list)
    new_apartaments_list = save_apartaments(url_api, url_list)


if __name__ == "__main__":
    apartaments = list()
    main()
