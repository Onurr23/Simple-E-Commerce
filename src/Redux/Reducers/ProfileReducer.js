let profile = {}

export function ProfileReducer(state=profile,action){

    if(action.type === 'PROFILE_LOADED'){

        return action.payload;

    }else{

        return state;

    }


}

export default ProfileReducer;