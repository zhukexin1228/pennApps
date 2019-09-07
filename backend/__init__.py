import json
from flask import Flask, render_template, g, session
from flask_cors import CORS
from flask_cache import make_template_fragment_key
from flask_caching import Cache


def creat_app():
    app = Flask(__name__, template_folder="templates",
                static_folder="static", static_url_path="/backend/static")
    cache = Cache(config={'CACHE_TYPE': 'simple'})
    # 防止跨域攻击
    CORS(app)
    # 注册蓝图
    from . import main
    app.register_blueprint(main.main)
    app.config['SECRET_KEY'] = '...自己生成的秘钥'
    app.debug = True
    cache.init_app(app)
    return app
# @app.route('/')
# def index():
#     # ...
#     return flask.render_template('index.html')
#
#
# @app.route("/getData")
# def getData():
#     query = flask.request.args.get("q", None)
#     print(query)
#
#     wage = 0
#     results = json.dumps({"query": query, "results": wage})
#
#     resp = flask.Response(results)
#     resp.headers["Content-Type"] = "application/json"
#     return resp
