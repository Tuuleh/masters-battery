#is this line ok or necessary?
from complete_battery import controllers
from tg import expose, TGController, AppConfig

config = AppConfig(minimal=True, root_controller=RootController())
config.renderers = ['jinja']
#enables you to serve static content (in the public folder)
config.serve_static = True
config.paths['static_files'] = 'public'

application = config.make_wsgi_app()
from wsgiref.simple_server import make_server

print "Serving on port 8080..."
httpd = make_server('', 8080, application)
httpd.serve_forever()