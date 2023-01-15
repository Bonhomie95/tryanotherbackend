import Root from "./Root";
import Auth from "./Auth";
import User from "./User";
import Role from "./Role";
import Cave from "./Cave";
import Notes from "./Notes";
import Post from "./Post";
import Comment from "./Comment";
import FlowRecorder from "./FlowRecorder";
import LyricAssistant from "./LyricAssistant"
import Conversation from "./Conversation";
import Payment from "./Payment";
import Message from "./Message";
import ActivityLogs from "./ActivityLogs"
import { Application } from "express";
import Organization from "./Organization";
import { NotFoundHandler } from "../../lib/src/middlewares";
import Invitation from "./Invitation";
import Project from "./Project";
import Task from "./Task"
import Subscribe from "./Subscribe"

/**
 * @class RouteManager
 * @classdesc Manager of all API routes
 */
export default class RouteManager {

    /**
     * @name installRoutes
     * @static
     * @param {Application} app 
     */
    static installRoutes(app: Application) {
        app.use(Root);
        app.use("/auth", Auth);
        app.use("/users", User);
        app.use("/roles", Role);
        app.use("/organizations", Organization);
        app.use("/invites", Invitation);
        app.use("/project", Project)
        app.use('/task', Task)
        app.use('/subscribe', Subscribe)
        app.use('/conversation', Conversation)
        app.use('/payment', Payment)
        app.use("/message", Message)
        app.use("/cave", Cave)
        app.use("/notes", Notes)
        app.use("/flowrecorder", FlowRecorder)
        app.use("/lyricassistant", LyricAssistant)
        app.use("/post", Post)
        app.use("/comment", Comment)
        app.use("/activitylogs", ActivityLogs)
        app.use(NotFoundHandler);

    }

}