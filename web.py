import json
import flask
app = flask.Flask(__name__)


@app.route('/')
def index():
    # ...
    return flask.render_template('index.html')


@app.route("/getData")
def getData():
    query = flask.request.args.get("q", None)
    print(query)

    wage = 0
    results = json.dumps({"query": query, "results": wage})

    resp = flask.Response(results)
    resp.headers["Content-Type"] = "application/json"
    return resp


if __name__ == '__main__':
    app.debug = True
    app.run()
