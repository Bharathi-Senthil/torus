'use server'
import axios from 'axios'

const encodeFormData = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export const loginWithRealm = async (data: any) => {
  let url = `http://192.168.2.165:8085/realms/${data.realm}/protocol/openid-connect/token`
  let maindata = { ...data, grant_type: 'password' }
  delete maindata.realm
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeFormData(maindata)
    })

    // Parsing JSON response and returning it
    const jsonResponse = await res.json()
    if (jsonResponse.error) return 'Invalid user credentials'
    return jsonResponse
  } catch (err) {
    return 'error'
  }
}

export const logoutRealm = async (data: any, token: any) => {
  if (!data.realm) return ''
  let logOutUrl = `http://192.168.2.165:8085/realms/${data.realm}/protocol/openid-connect/logout`
  let maindata = { ...data, refresh_token: token.refresh_token }
  delete maindata.realm
  try {
    const res = await fetch(logOutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeFormData(maindata)
    })

    return 'success'
  } catch (err) {
    return 'error'
  }
}

export const checkIsActive = async (data: any, token: any) => {
  let checkisAciveUrl = `http://192.168.2.165:8085/realms/${data.realm}/protocol/openid-connect/token/introspect`
  // if (token === undefined) return "failed";

  if (token.hasOwnProperty('access_token')) {
    let maindata = { ...data, token: token.access_token }
    delete maindata.realm
    try {
      const res = await fetch(checkisAciveUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodeFormData(maindata)
      })
        .then(res => res.json())
        .then(res => res)
      return res
    } catch (err) {
      return 'error'
    }
  }
  return 'error'
}

export const getAllRealmOnDatabase = async () => {
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL
  const res = await axios.get('${baseUrl}/keycloak/allRealm')
  return res.data
}

export const getVerifyOtp = async (data :any) => {
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL
  try {
    const res = await axios.post(
      `${baseUrl}/keycloak/sendVerificationOTP`,
      data
    );

    return res.data;
  } catch (err) {
    return "error";
  }
};

export const validateOtp = async (data :any) => {
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL
  try {
    const res = await axios.post(
      `${baseUrl}/keycloak/verifyMailId`,
      data
    );
    return res.data;
  } catch (err) {
    return "error";
  }
};


export const forgetPass = async (data :any) => {
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL
  let maindata = {
    email: data.email,
    realmId: data.realmId,
  };

  const res = await fetch(`${baseUrl}/keycloak/resetotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maindata),
  }).then((res) => res.json());
  return res;
};

export const otpCheck = async (data :any) => {
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL
  let maindata = {
    email: data.email,
    realmId: data.realmId,
    otp: data.otp,
  };
  try {
    const res = await axios.post(
      `${baseUrl}/keycloak/verifyPasswordOtp`,
      maindata
    );
    return res.data;
  } catch (err) {
    return "error";
  }
};

export const resetPasswordOnDatabase = async (data :any) => {
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL
  let maindata = {
    userId: data.userId,
    password: data.password,
  };
  try {
    const res = await axios.post(
      `${baseUrl}/keycloak/changepassword`,
      maindata
    );

    return res.data;
  } catch (err) {
    return "error";
  }
};