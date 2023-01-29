var telegram_bot = require('node-telegram-bot-api')
var request = require('request')
var token = '6086914137:AAHtQYX20-myxUaO-r39luITQ2xd2_PPGkM'
var bot = new telegram_bot(token, { polling: true });
bot.on("polling_error", (err) => console.log(err));
bot.onText(/\/city (.+)/, function (msg, match) {
	var city = match[1];
	var chatId = msg.chat.id
	var query =
    'http://api.openweathermap.org/data/2.5/weather?q='
		+ city + '&appid=6ce67c04b5565d320c6225d0ff681963';

	
	request(query, function (error, response, body) {

		if (!error && response.statusCode == 200) {

			bot.sendMessage(chatId,
				'_Looking for details of_ ' + city
				+ '...', { parse_mode: "Markdown" })
				.then((msg)=> {
				res = JSON.parse(body)
				var temp = Math.round((parseInt(
					res.main.temp_min) - 273.15), 2)
				bot.sendMessage(chatId, '**** '
					+ res.name + ' ****\nTemperature: '
					+ String(temp)+"degrees")
			})
		}
	})
})
