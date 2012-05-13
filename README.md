# Oscillate

## Setup

Oscillate is powered by [Jekyll](https://github.com/mojombo/jekyll/wiki) and hosted by [Github pages](http://pages.github.com).

## Posting an interview

Each interview will need a markdown document in the '\_posts' directory. The filename of the post will be _year-month-day-title.md_ (eg: 2012-05-13-joseph-churchward.md).

The first section of the file sets up a few things, and should look something like this:

```
---
title: Title of the post
layout: audio (currently only audio is supported)
excerpt: This is displayed on the homepage and in the RSS file
interview: 36137744 (this is a soundcloud track ID)
slides: /json/2012-05-13-stamps.json (this is a json file containing the images and timing info)
---
```


### Getting a track ID from a soundcloud url.

Unfortunately this bit is a little manual/annoying. [Go here](http://api.soundcloud.com/resolve.json?url=PUT_SOUNDCLOUD_TRACK_URL_HERE&client_id=d47b942351e59deb9ec38d90a15beb81) and then replace the __PUT\_SOUNDCLOUD\_TRACK\_URL\_HERE__ with your url. You'll be redirected to a json page with info about the track, where you can find the ID.

```
http://api.soundcloud.com/resolve.json?url=PUT_SOUNDCLOUD_TRACK_URL_HERE&client_id=d47b942351e59deb9ec38d90a15beb81
```