/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author PC
 */
@Path("competitions")
public class CompetitionsResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CompetitionsResource
     */
    public CompetitionsResource() {
    }

    /**
     * Retrieves representation of an instance of rest.CompetitionsResource
     *
     * @return an instance of java.lang.String
     */

    @GET
    @Path("/{id}")
    @RolesAllowed({"user", "admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getCompetition(@PathParam("id") String id) throws IOException, MalformedURLException {
        String sURL = "http://api.football-data.org/v1/competitions/" + id; //just a string

        // Connect to the URL using java's native library
        URL url = new URL(sURL);
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.addRequestProperty("X-Auth-Token", "ffa92b7408d542fdb9b5d4645458c723");
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonObject rootobj = root.getAsJsonObject(); //May be an array, may be an object. //just grab the zipcode
        return rootobj.toString();
    }

    @GET
    @Path("/{id}/teams")
    @RolesAllowed({"user", "admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllTeamsFromCompetition(@PathParam("id") String id) throws IOException, MalformedURLException {
        String sURL = "http://api.football-data.org/v1/competitions/" + id + "/teams"; //just a string

        // Connect to the URL using java's native library
        URL url = new URL(sURL);
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.addRequestProperty("X-Auth-Token", "ffa92b7408d542fdb9b5d4645458c723");
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonObject rootobj = root.getAsJsonObject(); //May be an array, may be an object. //just grab the zipcode
        return rootobj.toString();
    }

    @GET
    @Path("/{id}/fixtures")
    @RolesAllowed({"user", "admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllFixtures(@PathParam("id") String id) throws IOException, MalformedURLException {
        String sURL = "http://api.football-data.org/v1/competitions/" + id + "/fixtures"; //just a string

        // Connect to the URL using java's native library
        URL url = new URL(sURL);
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.addRequestProperty("X-Auth-Token", "ffa92b7408d542fdb9b5d4645458c723");
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonObject rootobj = root.getAsJsonObject(); //May be an array, may be an object. //just grab the zipcode
        return rootobj.toString();
    }

    @GET
    @Path("/{id}/leagueTable")
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllLeagueTables(@PathParam("id") String id) throws IOException, MalformedURLException {
        String sURL = "http://api.football-data.org/v1/competitions/" + id + "/leagueTable"; //just a string

        // Connect to the URL using java's native library
        URL url = new URL(sURL);
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.addRequestProperty("X-Auth-Token", "ffa92b7408d542fdb9b5d4645458c723");
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonObject rootobj = root.getAsJsonObject(); //May be an array, may be an object. //just grab the zipcode
        return rootobj.toString();
    }

}
