package com.assignment;

import android.annotation.SuppressLint;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import android.widget.Toast;

public class ReactOneCustomMethod extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    ReactOneCustomMethod(ReactApplicationContext context) {
       super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "ReactOneCustomMethod";
    }

    @ReactMethod
    public void getPhoneID(Promise response) {
        try {
            @SuppressLint("HardwareIds") String id = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.ANDROID_ID);
            response.resolve(id);
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }

    @ReactMethod
    public void showMessage(String message) {
        // Display a toast message
        Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show();
    }
}