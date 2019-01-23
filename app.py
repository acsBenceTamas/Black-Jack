from flask import Flask, render_template, url_for
import database_connection
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', active_page="index")


@app.route('/game')
def game():
    cards = database_connection.get_all_cards()
    card_ids = [card['id'] for card in cards]
    return render_template('game.html',
                           cards=json.dumps(cards),
                           card_ids=json.dumps(card_ids),
                           image_path=url_for('static', filename='images/'),
                           active_page="game")


if __name__ == '__main__':
    app.run(debug=True)
