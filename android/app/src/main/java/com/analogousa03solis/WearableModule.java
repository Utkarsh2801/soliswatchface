package com.analogousa03solis;

import android.content.Intent;
import android.net.Uri;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.android.gms.wearable.Node;
import com.google.android.gms.wearable.Wearable;
import androidx.wear.remote.interactions.RemoteActivityHelper;


import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class WearableModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final Executor executor;
    private final RemoteActivityHelper remoteActivityHelper;

    public WearableModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.executor = Executors.newSingleThreadExecutor();
        this.remoteActivityHelper = new RemoteActivityHelper(reactContext, executor);
    }

    @Override
    public String getName() {
        return "WearableModule";
    }

    @ReactMethod
    public void startRemoteActivity(final Promise promise) {
        Wearable.getNodeClient(reactContext).getConnectedNodes().addOnSuccessListener(nodes -> {
            if (nodes.size() > 0) {
                Node node = nodes.get(0);
                Intent intent = new Intent(Intent.ACTION_VIEW)
                        .addCategory(Intent.CATEGORY_BROWSABLE)
                        .setData(Uri.parse("https://play.google.com/store/apps/details?id=com.analogousa03solis"));
                ListenableFuture<Void> result = remoteActivityHelper.startRemoteActivity(intent, node.getId());
                result.addListener(() -> {
                    try {
                        result.get();
                        promise.resolve(node.getDisplayName());
                    } catch (Exception e) {
                        promise.reject("FAILED", "Failed to start remote activity: " + e.getMessage());
                    }
                }, executor);
            } else {
                promise.reject("FAILED", "No connected wear watch");
            }
        }).addOnFailureListener(e -> promise.reject("FAILED", "Unable to get connected nodes: " + e.getMessage()));
    }

    @ReactMethod
    public void checkRemoteDevices(final Promise promise) {
        Wearable.getNodeClient(reactContext).getConnectedNodes().addOnSuccessListener(nodes -> {
            if (nodes.size() > 0) {
                Node node = nodes.get(0);
                promise.resolve(node.getDisplayName());
            } else {
                promise.resolve("");
            }
        }).addOnFailureListener(e -> promise.reject("FAILED", "Unable to get connected nodes: " + e.getMessage()));
    }
}
