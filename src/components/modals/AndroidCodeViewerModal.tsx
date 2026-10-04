import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { ArrowLeft, Copy, Check, FileCode, FolderGit2, Smartphone } from 'lucide-react';

interface CodeFile {
  name: string;
  type: 'java' | 'xml' | 'gradle' | 'rules';
  path: string;
  code: string;
}

export const AndroidCodeViewerModal: React.FC = () => {
  const { closeModal } = useApp();
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const files: CodeFile[] = [
    {
      name: 'MainActivity.java',
      type: 'java',
      path: 'app/src/main/java/com/veda/hostel/student/MainActivity.java',
      code: `package com.veda.hostel.student;

import android.os.Bundle;
import android.view.MenuItem;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.veda.hostel.student.fragments.TodayFragment;
import com.veda.hostel.student.fragments.ActivityFragment;
import com.veda.hostel.student.fragments.HostelFragment;
import com.veda.hostel.student.fragments.MeFragment;

public class MainActivity extends AppCompatActivity {

    private BottomNavigationView bottomNav;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bottomNav = findViewById(R.id.bottomNavigationView);
        bottomNav.setOnItemSelectedListener(new BottomNavigationView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                Fragment selectedFragment = null;
                int itemId = item.getItemId();

                if (itemId == R.id.nav_today) {
                    selectedFragment = new TodayFragment();
                } else if (itemId == R.id.nav_activity) {
                    selectedFragment = new ActivityFragment();
                } else if (itemId == R.id.nav_hostel) {
                    selectedFragment = new HostelFragment();
                } else if (itemId == R.id.nav_me) {
                    selectedFragment = new MeFragment();
                }

                if (selectedFragment != null) {
                    getSupportFragmentManager().beginTransaction()
                        .replace(R.id.fragment_container, selectedFragment)
                        .commit();
                    return true;
                }
                return false;
            }
        });

        // Set default fragment to TODAY
        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, new TodayFragment())
                .commit();
        }
    }
}`,
    },
    {
      name: 'TodayFragment.java',
      type: 'java',
      path: 'app/src/main/java/com/veda/hostel/student/fragments/TodayFragment.java',
      code: `package com.veda.hostel.student.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.veda.hostel.student.R;
import com.veda.hostel.student.AttendanceDetailsActivity;

public class TodayFragment extends Fragment {

    private CardView cardActiveAttendance;
    private CardView cardNoAttendance;
    private TextView tvStudentGreeting;
    private TextView tvHostelInfo;
    private TextView tvAttendancePrompt;
    private Button btnMarkPresent;
    private FirebaseFirestore db;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_today, container, false);

        cardActiveAttendance = view.findViewById(R.id.cardActiveAttendance);
        cardNoAttendance = view.findViewById(R.id.cardNoAttendance);
        tvStudentGreeting = view.findViewById(R.id.tvStudentGreeting);
        tvHostelInfo = view.findViewById(R.id.tvHostelInfo);
        tvAttendancePrompt = view.findViewById(R.id.tvAttendancePrompt);
        btnMarkPresent = view.findViewById(R.id.btnMarkPresent);

        db = FirebaseFirestore.getInstance();
        listenToActiveAttendanceSession();

        btnMarkPresent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(), AttendanceDetailsActivity.class);
                startActivity(intent);
            }
        });

        return view;
    }

    private void listenToActiveAttendanceSession() {
        // Real-time Firestore synchronization with Warden App
        db.collection("attendance_sessions")
            .whereEqualTo("status", "ACTIVE")
            .whereEqualTo("hostelName", "Charak Chatras")
            .addSnapshotListener((queryDocumentSnapshots, e) -> {
                if (e != null || queryDocumentSnapshots == null) return;

                if (!queryDocumentSnapshots.isEmpty()) {
                    DocumentSnapshot sessionDoc = queryDocumentSnapshots.getDocuments().get(0);
                    String endTime = sessionDoc.getString("endTime");
                    tvAttendancePrompt.setText("Please mark your presence before " + endTime + ".");
                    cardActiveAttendance.setVisibility(View.VISIBLE);
                    cardNoAttendance.setVisibility(View.GONE);
                } else {
                    cardActiveAttendance.setVisibility(View.GONE);
                    cardNoAttendance.setVisibility(View.VISIBLE);
                }
            });
    }
}`,
    },
    {
      name: 'AttendanceDetailsActivity.java',
      type: 'java',
      path: 'app/src/main/java/com/veda/hostel/student/AttendanceDetailsActivity.java',
      code: `package com.veda.hostel.student;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class AttendanceDetailsActivity extends AppCompatActivity {

    private TextView tvSessionTitle, tvHostelName, tvDate, tvTime, tvStatus;
    private Button btnMarkMyPresence;
    private ImageView btnBack;
    private FirebaseFirestore db;
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_attendance_details);

        db = FirebaseFirestore.getInstance();
        mAuth = FirebaseAuth.getInstance();

        btnBack = findViewById(R.id.btnBack);
        tvSessionTitle = findViewById(R.id.tvSessionTitle);
        tvHostelName = findViewById(R.id.tvHostelName);
        tvDate = findViewById(R.id.tvDate);
        tvTime = findViewById(R.id.tvTime);
        tvStatus = findViewById(R.id.tvStatus);
        btnMarkMyPresence = findViewById(R.id.btnMarkMyPresence);

        btnBack.setOnClickListener(v -> finish());

        btnMarkMyPresence.setOnClickListener(v -> markAttendance());
    }

    private void markAttendance() {
        btnMarkMyPresence.setEnabled(false);
        String studentId = "24AIM001"; // Authenticated Student ID
        String dateStr = new SimpleDateFormat("d MMM yyyy", Locale.getDefault()).format(new Date());
        String timeStr = new SimpleDateFormat("hh:mm a", Locale.getDefault()).format(new Date());

        Map<String, Object> attendanceData = new HashMap<>();
        attendanceData.put("studentId", studentId);
        attendanceData.put("sessionId", "sess_night_active");
        attendanceData.put("sessionTitle", "Night Attendance");
        attendanceData.put("date", dateStr);
        attendanceData.put("time", timeStr);
        attendanceData.put("status", "Present");
        attendanceData.put("verificationMethod", "Self-App");
        attendanceData.put("markedAt", System.currentTimeMillis());

        db.collection("attendance_records")
            .document(studentId + "_sess_night_active")
            .set(attendanceData)
            .addOnSuccessListener(aVoid -> {
                Intent successIntent = new Intent(AttendanceDetailsActivity.this, AttendanceSuccessActivity.class);
                startActivity(successIntent);
                finish();
            })
            .addOnFailureListener(e -> {
                btnMarkMyPresence.setEnabled(true);
                Toast.makeText(AttendanceDetailsActivity.this, "Error: " + e.getMessage(), Toast.LENGTH_SHORT).show();
            });
    }
}`,
    },
    {
      name: 'activity_main.xml',
      type: 'xml',
      path: 'app/src/main/res/layout/activity_main.xml',
      code: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/veda_deep_navy">

    <!-- Fragment Container for TODAY, ACTIVITY, HOSTEL, ME -->
    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toTopOf="@id/bottomNavigationView"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <!-- Primary Bottom Navigation: TODAY, ACTIVITY, HOSTEL, ME -->
    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNavigationView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:background="@color/veda_surface_navy"
        app:itemIconTint="@color/bottom_nav_selector"
        app:itemTextColor="@color/bottom_nav_selector"
        app:menu="@menu/bottom_nav_menu"
        app:labelVisibilityMode="labeled"
        app:elevation="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`,
    },
    {
      name: 'bottom_nav_menu.xml',
      type: 'xml',
      path: 'app/src/main/res/menu/bottom_nav_menu.xml',
      code: `<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/nav_today"
        android:icon="@drawable/ic_today_calendar"
        android:title="TODAY" />

    <item
        android:id="@+id/nav_activity"
        android:icon="@drawable/ic_activity_history"
        android:title="ACTIVITY" />

    <item
        android:id="@+id/nav_hostel"
        android:icon="@drawable/ic_hostel_building"
        android:title="HOSTEL" />

    <item
        android:id="@+id/nav_me"
        android:icon="@drawable/ic_user_profile"
        android:title="ME" />
</menu>`,
    },
    {
      name: 'colors.xml',
      type: 'xml',
      path: 'app/src/main/res/values/colors.xml',
      code: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- VEDA Official Design System Colors -->
    <color name="veda_deep_navy">#070D1E</color>
    <color name="veda_surface_navy">#101B36</color>
    <color name="veda_card_navy">#142347</color>
    <color name="veda_primary_blue">#1B73E8</color>
    <color name="veda_bright_blue">#2563EB</color>
    <color name="veda_attendance_coral">#EA384D</color>
    <color name="veda_success_green">#10B981</color>
    <color name="veda_warning_amber">#F59E0B</color>
    <color name="veda_text_primary">#FFFFFF</color>
    <color name="veda_text_secondary">#94A3B8</color>
    <color name="veda_border_navy">#1E293B</color>
</resources>`,
    },
    {
      name: 'firestore.rules',
      type: 'rules',
      path: 'firestore.rules',
      code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions for student data isolation
    function isAuthenticated() {
      return request.auth != null;
    }

    function isStudentOwner(studentId) {
      return isAuthenticated() && request.auth.uid == studentId;
    }

    // Students collection: Student can ONLY read their own record
    match /students/{studentId} {
      allow read: if isStudentOwner(studentId);
      allow write: if false; // Only Warden admin can update
    }

    // Attendance sessions: Read-only for students
    match /attendance_sessions/{sessionId} {
      allow read: if isAuthenticated();
      allow write: if false; // Only Warden creates/closes
    }

    // Attendance records: Student can only create/read their own record
    match /attendance_records/{recordId} {
      allow read: if isAuthenticated() && resource.data.studentId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.studentId == request.auth.uid;
      allow update, delete: if false;
    }

    // Notices: Public read for residents
    match /notices/{noticeId} {
      allow read: if isAuthenticated();
      allow write: if false;
    }

    // Mess menu: Public read for residents
    match /mess_menu/{menuId} {
      allow read: if isAuthenticated();
      allow write: if false;
    }
  }
}`,
    },
  ];

  const currentFile = files[selectedFileIdx];

  const copyCode = () => {
    navigator.clipboard?.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070d1e] text-white flex flex-col justify-between overflow-y-auto select-none">
      <StatusBar lightMode={false} />

      {/* Top Bar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-800/60 sticky top-0 bg-[#070d1e]/90 backdrop-blur-md z-10">
        <button
          onClick={closeModal}
          className="p-2 -ml-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 active:scale-95 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center space-x-1.5">
            <Smartphone size={15} className="text-blue-400" />
            <span>Native Android Code (Java + XML)</span>
          </h2>
          <p className="text-[10px] text-slate-400">Android Studio • Java & XML Spec</p>
        </div>
        <button
          onClick={copyCode}
          className="p-2 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white flex items-center space-x-1 text-xs cursor-pointer"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span className="text-[11px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* File Selector Tabs */}
      <div className="px-3 py-2 bg-slate-950/80 border-b border-slate-800 overflow-x-auto no-scrollbar flex space-x-1.5">
        {files.map((file, idx) => (
          <button
            key={file.name}
            onClick={() => setSelectedFileIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedFileIdx === idx
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-[#101b36] text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Code Display Area */}
      <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="mb-2 text-[11px] text-slate-400 font-mono flex items-center justify-between">
          <span>Path: {currentFile.path}</span>
          <span className="uppercase text-blue-400">{currentFile.type}</span>
        </div>
        <div className="bg-[#040814] border border-slate-800 rounded-2xl p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-slate-200 leading-relaxed selection:bg-blue-600">
            <code>{currentFile.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
