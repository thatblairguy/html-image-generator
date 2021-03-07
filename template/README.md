# Template Files Tips

A useful starting point for creating a template file is to create a flat HTML file to create the layout. Create a container `div` tag, style it with the desired dimensions of the generated images, and give it a visible border. Once you've done that, the file may be loaded in your browser of choice while you work out the final layout.

Once the layout is complete, copy the layout file to the template, set the border to match the background, and replace the placeholder text, images, etc. with the corresponding names from the data objects.

* Relative urls are resolved relative to the template file.
  * If the template is in the `template` directory, and the `template/image` directory contains `owl.png`, the template may reference it as `image/owl.png`.
* References starting with `file://` must use absolute paths.
* Files on remote http servers may be referenced using full URLs.

Technically, template files are [Handlebars templates](https://handlebarsjs.com/), and may be as complex or simple as desired.
