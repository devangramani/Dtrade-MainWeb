const iState = {
  scriptdata: "",
};

const Reducer = (state = iState, action) => {
  switch (action.type) {
    case "SCRIPTDATA":
      return {
        ...state,
        scriptdata: action.payload,
      };
    case "CLEAR_PF":
      return {
        ...state,
        pfdata: [],
        total: 0,
      };
    case "PF": {
      if (action.total > 0) {
        var newpfdata = state.pfdata;
        if (Array.isArray(newpfdata)) {
          var found = false;
          for (var i = 0; i < newpfdata.length; i++) {
            if (newpfdata[i].script_id == action.script_id) {
              found = i;
              continue;
            }
          }
          if (found === false) {
            newpfdata.push({
              script_id: action.script_id,
              pf: action.pf,
            });
            var total = 0;
            newpfdata.map((i) => {
              total = parseFloat(total) + parseFloat(i.pf);
            });
            return { ...state, pfdata: newpfdata, total: total };
          } else {
            newpfdata[found].pf = action.pf;
            var total = 0;
            newpfdata.map((i) => {
              total = parseFloat(total) + parseFloat(i.pf);
            });
            return { ...state, pfdata: newpfdata, total: total };
          }
        } else {
          newpfdata.push({
            script_id: action.script_id,
            pf: action.pf,
          });
          return { ...state, pfdata: newpfdata, total: action.pf };
        }
      }
    }

    default:
      return { ...state };
  }
};

export default Reducer;
