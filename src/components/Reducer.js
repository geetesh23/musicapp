export const initialState = {
    user: null,
    playlist :[],
    playing: false,
    item: null,
    // remove after finished developing the complete project
    // token: 'BQCPA5OB1L_i3j1Zn20K0nHtIUybGQldNUyGgGNgku0Kvsq9IDzH7SoDUfqWtSshBvM-nJQ498OVtZLOvdaeCTBicrLTJacfiG44krkmSPoI7m-klJ8Fsn3KgHy2XdJfXPKV8-Xlrj-iKstQRWW3Sslrbxl3dstT_tXXwlXZp4SzzcIc7ozjSHeO__sAcPtTqINTKbb30_y-RBAyA27a', 
}


const reducer = (state, action) =>{
    switch(action.type) {
        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token
            }
        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            };
        case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists,
            };
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            };
        case "SET_SEARCHRESULTS":
            return{
                ...state,
                searchResults: action.searchResults
            }
        case "Change_Search":
            return{
                ...state,
                search:action.search
            };
        case 'SET_PLAYLISTS':
            return{
                ...state,
                playlists: action.playlists,
            }
        case 'SET_DISCOVER_WEEKLY':
            return{
                ...state,
                discover_weekly: action.discover_weekly
            }
        default:
            return state;
    }
}

export default reducer;