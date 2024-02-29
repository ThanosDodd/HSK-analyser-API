Analyse Chinese (mandarin) text. Send your text and get a list of words distributed by HSK level.

Send your text in JSON in the format:
{"test":"your text here"}

You receive an object called matches where matches.one is an array of HSK one words and onwards up to matches.six.

This API is hosted on https://hsk-analyser-api.onrender.com

You can give the API a go at https://hsk-text-analyser.vercel.app/. Bear in mind that the API is hosted on the free tier on Render so the first call may be unsuccessful as the server may have spun down. Wait a minute and try again.
