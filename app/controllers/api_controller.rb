class ApiController < ApplicationController
  def api
  end

  def get_weather
    base_url = "http://api.wunderground.com/api/"
    api_key = WU_API
    base_rest = "/geolookup/conditions/q/"
    query = params[:zip]
    url = base_url + api_key + base_rest + query + ".json"
    response = HTTParty.get(url)
    respond_to do |format|
      format.json {
         render json: {:weather => response}
      }
    end
  end
end
