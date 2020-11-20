import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../src/authConfig";
import React, { useEffect, useState } from "react";
import { ProfileData } from "../src/ProfileData";
import { callMsGraph } from "../src/MsGraphApiCall";
import Paper from "@material-ui/core/Paper";

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
  
    function requestProfileData() {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
            redirectUri: "http://localhost:3000"
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    useEffect(() => {
        requestProfileData();
    }, []);
  
    return (
        <Paper>
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </Paper>
    );
};

export default function Profile() {

    const authRequest = {
        ...loginRequest,
        redirectUri: "http://localhost:3000"
    };

    return (
        <MsalAuthenticationTemplate interactionType="popup" authenticationRequest={authRequest}>
            <ProfileContent />
        </MsalAuthenticationTemplate>
      )
}