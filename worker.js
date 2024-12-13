/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx) {
      const CF_GET_IDENTITY = "https://vldconsulting.cloudflareaccess.com/cdn-cgi/access/get-identity";
      const id = await (await fetch(CF_GET_IDENTITY, request)).json()
      const userEmail = id.email;
      const userCountry = id.geo.country;
      const issueTime = id.iat;
      
      let html_content = "";
      let html_style =
        "body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}";
  
      html_content += "<p>" + userEmail + " authenticated at " + issueTime + " from " + "<a href=https://tunnel.vldconsulting.com/secure/" + userCountry + ".jpg>" + userCountry + "</a></p>";
  
      let html = `<!DOCTYPE html>
        <head>
          <title> Cloudflare Workers Output </title>
          <style> ${html_style} </style>
        </head>
        <body>
          <h1>Cloudflare Workers output</h1>
          ${html_content}
        </body>`;
  
      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
  
        },
      });
    },
  };