export const colibriStatsMap: Record<
  string,
  { name: string; type: string; help: string }
> = {
  inactive_endpoints: {
    name: "inactive_endpoints",
    type: "gauge",
    help:
      "current number of endpoints in inactive conferences (see inactive_conferences)",
  },
  inactive_conferences: {
    name: "inactive_conferences",
    type: "gauge",
    help:
      "current number of conferences in which no endpoints are sending audio nor video. Note that this includes conferences which are currently using a peer-to-peer transport",
  },
  /* https://github.com/jitsi/jitsi-videobridge/blob/master/doc/statistics.md note: currently broken
    total_ice_succeeded_relayed: {
      name: "ice_succeeded_relayed_total",
      type: "gauge",
      help: "total number of endpoints which connected through a TURN relay (currently broken)"
    },
  */
  total_loss_degraded_participant_seconds: {
    name: "loss_degraded_participant_seconds_total",
    type: "counter",
    help: "The total number of participant-seconds that are loss-controlled",
  },
  bit_rate_download: {
    name: "bit_rate_download_kbps",
    type: "gauge",
    help: "current incoming bitrate (RTP) in kilobits per second",
  },
  local_active_endpoints: {
    name: "local_active_endpoints",
    type: "gauge",
    help:
      "current number of local endpoints (not octo) which are in an active conference. This includes endpoints which are not sending audio or video, but are in an active conference (i.e. they are receive-only)",
  },
  muc_clients_connected: {
    name: "muc_clients_connected",
    type: "gauge",
    help: "Number of configured MUC clients that are connected to XMPP",
  },
  total_participants: {
    name: "participants_total",
    type: "counter",
    help: " total number of endpoints created",
  },
  total_packets_received: {
    name: "packets_received_total",
    type: "counter",
    help: "total number of RTP packets received",
  },
  rtt_aggregate: {
    name: "rtt_aggregate_ms",
    type: "gauge",
    help:
      "round-trip-time measured via RTCP averaged over all local endpoints with a valid RTT measurement in milliseconds",
  },
  packet_rate_upload: {
    name: "packet_rate_upload",
    type: "gauge",
    help: "current RTP outgoing packet rate in packets per second",
  },
  p2p_conferences: {
    name: "p2p_conferences",
    type: "gauge",
    help:
      "current number of peer-to-peer conferences. These are conferences of size 2 in which no endpoint is sending audio not video. Presumably the endpoints are using a peer-to-peer transport at this time.",
  },
  total_aimd_bwe_expirations: {
    name: "aimd_bwe_expirations_total",
    type: "counter",
    help:
      "total number of times our AIMDs have expired the incoming bitrate (and which would otherwise result in video suspension)",
  },
  total_loss_limited_participant_seconds: {
    name: "loss_limited_participant_seconds_total",
    type: "counter",
    help:
      "total number of participant-seconds that are loss-limited on this Videobridge",
  },
  preemptive_kfr_suppressed: {
    name: "preemptive_kfr_suppressed_total",
    type: "counter",
    help:
      "Number of preemptive keyframe requests that were not sent because no endpoints were in stage view.",
  },
  local_endpoints: {
    name: "local_endpoints",
    type: "gauge",
    help: "current number of local (non-octo) endpoints",
  },
  octo_send_bitrate: {
    name: "octo_send_bitrate_bps",
    type: "gauge",
    help:
      "current outgoing bitrate on the octo channel (combined for all conferences) in bits per second",
  },
  total_dominant_speaker_changes: {
    name: "dominant_speaker_changes_total",
    type: "counter",
    help: "total number of times the dominant speaker in a conference changed",
  },
  endpoints_with_spurious_remb: {
    name: "endpoints_with_spurious_remb_total",
    type: "counter",
    help:
      "total number of endpoints which have sent an RTCP REMB packet when REMB was not signaled",
  },
  receive_only_endpoints: {
    name: "receive_only_endpoints",
    type: "gauge",
    help: "current number of endpoints which are not sending audio nor video",
  },
  total_colibri_web_socket_messages_received: {
    name: "colibri_web_socket_messages_received_total",
    type: "counter",
    help:
      'total number of messages received on a Colibri "bridge channel" messages received on a WebSocket.',
  },
  octo_receive_bitrate: {
    name: "octo_receive_bitrate_bps",
    type: "gauge",
    help:
      "current incoming bitrate on the octo channel (combined for all conferences) in bits per second",
  },
  /*  version: {
      name: "version",
      type: "gauge",
      help: ""
    },*/
  total_ice_succeeded: {
    name: "ice_succeeded_total",
    type: "counter",
    help:
      "total number of endpoints which successfully established an ICE connection",
  },
  total_colibri_web_socket_messages_sent: {
    name: "colibri_web_socket_messages_sent_total",
    type: "counter",
    help:
      'total number of messages sent over a Colibri "bridge channel" messages sent over a WebSocket',
  },
  total_bytes_sent_octo: {
    name: "bytes_sent_octo_total",
    type: "counter",
    help: "total number of bytes sent on the octo channel",
  },
  total_data_channel_messages_received: {
    name: "data_channel_messages_received_total",
    type: "counter",
    help:
      'total number of Colibri "bridge channel" messages received on SCTP data channels',
  },
  total_conference_seconds: {
    name: "conference_seconds_total",
    type: "counter",
    help:
      "total number of conference-seconds served (only updates once a conference expires)",
  },
  num_eps_oversending: {
    name: "num_eps_oversending",
    type: "gauge",
    help: "current number of endpoints to which we are oversending",
  },
  bit_rate_upload: {
    name: "bit_rate_upload_kbps",
    type: "gauge",
    help: "current outgoing bitrate (RTP) in kilobits per second",
  },
  total_conferences_completed: {
    name: "conferences_completed_total",
    type: "counter",
    help: "total number of conferences completed",
  },
  octo_conferences: {
    name: "octo_conferences",
    type: "gauge",
    help: "current number of conferences in which octo is enabled",
  },
  num_eps_no_msg_transport_after_delay: {
    name: "num_eps_no_msg_transport_after_delay_total",
    type: "counter",
    help:
      "number of endpoints which had not established an endpoint message transport even after some delay.",
  },
  /*  region: {
      name: "region",
      type: "gauge",
      help: ""
    },*/
  endpoints_sending_video: {
    name: "endpoints_sending_video",
    type: "gauge",
    help: "current number of endpoints sending video",
  },
  packet_rate_download: {
    name: "packet_rate_download",
    type: "gauge",
    help: "current RTP incoming packet rate in packets per second",
  },
  muc_clients_configured: {
    name: "muc_clients_configured",
    type: "gauge",
    help: "number of configured MUC clients",
  },
  outgoing_loss: {
    name: "outgoing_loss_ratio",
    type: "gauge",
    help: "fraction of outgoing packets that were lost",
  },
  overall_loss: {
    name: "overall_loss",
    type: "gauge",
    help: "fraction of incoming and outgoing packets that were lost",
  },

  total_packets_sent_octo: {
    name: "packets_sent_octo_total",
    type: "counter",
    help: "total number packets sent over the octo channel",
  },
  total_layering_changes_received: {
    name: "layering_changes_received_total",
    type: "counter",
    help:
      "total number of times the layering of an incoming video stream changed (updated on endpoint expiration).",
  },
  total_relays: {
    name: "relays_total",
    type: "counter",
    help: "total number of relays created",
  },
  endpoints_with_high_outgoing_loss: {
    name: "endpoints_with_high_outgoing_loss",
    type: "gauge",
    help:
      "number of active endpoints that have more than 10% loss in the bridge->endpoint direction",
  },
  stress_level: {
    name: "stress_level_ratio",
    type: "gauge",
    help:
      "current stress level on the bridge, with 0 indicating no load and 1 indicating the load is at full capacity (though values >1 are permitted).",
  },
  jitter_aggregate: {
    name: "jitter_aggregate_ms",
    type: "gauge",
    help:
      "maybe broken: https://github.com/jitsi/jitsi-videobridge/blob/6678185b2803841d0d18096fdbb0bdb83c8de524/jvb/src/main/java/org/jitsi/videobridge/stats/VideobridgeStatistics.java#L478",
  },
  drain: {
    name: "drain",
    type: "gauge",
    help: "bridge will not be assigned to new conferences when in drain mode",
  },
  total_video_stream_milliseconds_received: {
    name: "video_stream_milliseconds_received_total",
    type: "counter",
    help:
      "The total duration, in milliseconds, of video streams (SSRCs) that were received. For example, if an endpoint sends simulcast with 3 SSRCs for 1 minute it would contribute a total of 3 minutes. Suspended streams do not contribute to this duration. This is updated on endpoint expiration.",
  },
  /* Currently, broken according to the jvb-statistics documentation
    total_ice_succeeded_tcp: {
      name: "ice_succeeded_tcp_total",
      type: "counter",
      help: ""
    },*/
  octo_endpoints: {
    name: "octo_endpoints",
    type: "gauge",
    help:
      "current number of octo endpoints (connected to remove jitsi-videobridge instances)",
  },
  total_packets_dropped_octo: {
    name: "packets_dropped_octo_total",
    type: "counter",
    help: "total number of packets dropped on the octo channel.",
  },
  num_relays_no_msg_transport_after_delay: {
    name: "num_relays_no_msg_transport_after_delay_total",
    type: "counter",
    help:
      "The number of relays which had not established a relay message transport even after some delay.",
  },
  conferences: {
    name: "conferences",
    type: "gauge",
    help: "current number of conferences.",
  },
  /* Deprecated according to the jvb-statistics documentation
    participants: {
      name: "participants",
      type: "gauge",
      help: ""
    },*/
  total_keyframes_received: {
    name: "keyframes_received_total",
    type: "counter",
    help:
      "total number of keyframes that were received (updated on endpoint expiration)",
  },
  average_participant_stress: {
    name: "average_participant_stress_ratio",
    type: "gauge",
    help: "",
  },
  largest_conference: {
    name: "largest_conference",
    type: "gauge",
    help:
      "size of the current largest conference (counting all endpoints, including octo endpoints which are connected to a different jitsi-videobridge instance)",
  },
  total_packets_sent: {
    name: "packets_sent_total",
    type: "counter",
    help: "total number of RTP packets sent",
  },
  endpoints: {
    name: "endpoints",
    type: "gauge",
    help: "the current number of endpoints, including octo endpoints",
  },
  total_data_channel_messages_sent: {
    name: "data_channel_messages_sent_total",
    type: "counter",
    help:
      'total number of Colibri "bridge channel" messages sent over SCTP data channels',
  },
  incoming_loss: {
    name: "incoming_loss_ratio",
    type: "gauge",
    help: "fraction of incoming packets that were lost",
  },
  total_bytes_received_octo: {
    name: "bytes_received_octo_total",
    type: "counter",
    help: "total number of bytes received on the octo channel",
  },
  octo_send_packet_rate: {
    name: "octo_send_packet_rate",
    type: "gauge",
    help:
      "current outgoing packet rate on the octo channel (combined for all conferences) in packets per second",
  },
  total_conferences_created: {
    name: "conferences_created_total",
    type: "counter",
    help: "total number of conferences created",
  },
  total_ice_failed: {
    name: "ice_failed_total",
    type: "counter",
    help:
      "total number of endpoints which failed to establish an ICE connection",
  },
  preemptive_kfr_sent: {
    name: "preemptive_kfr_sent_total",
    type: "counter",
    help: "total number of preemptive keyframe requests sent",
  },
  threads: {
    name: "threads",
    type: "gauge",
    help: "current number of JVM threads",
  },
  /* Deprecated according to the jvb-statistics documentation
    videochannels: {
      name: "videochannels",
      type: "gauge",
      help: ""
    },*/
  total_packets_received_octo: {
    name: "packets_received_octo_total",
    type: "counter",
    help: "total number packets received on the octo channel",
  },
  graceful_shutdown: {
    name: "graceful_shutdown",
    type: "gauge",
    help:
      "whether jitsi-videobridge is currently in graceful shutdown mode (hosting existing conferences, but not accepting new ones)",
  },
  octo_receive_packet_rate: {
    name: "octo_receive_packet_rate",
    type: "gauge",
    help:
      "current incoming packet rate on the octo channel (combined for all conferences) in packets per second",
  },
  total_bytes_received: {
    name: "bytes_received_total",
    type: "counter",
    help: "total number of bytes received in RTP",
  },
  total_loss_controlled_participant_seconds: {
    name: "loss_controlled_participant_seconds_total",
    type: "counter",
    help:
      "total number of participant-milliseconds that are loss-controlled on this videobridge",
  },
  total_partially_failed_conferences: {
    name: "partially_failed_conferences_total",
    type: "counter",
    help:
      "total number of conferences in which at least one endpoint failed to establish an ICE connection",
  },
  endpoints_sending_audio: {
    name: "endpoints_sending_audio",
    type: "gauge",
    help: "current number of endpoints sending (non-silence) audio",
  },
  dtls_failed_endpoints: {
    name: "dtls_failed_endpoints_total",
    type: "counter",
    help:
      "the total number of endpoints which failed to establish a DTLS connection",
  },
  healthy: {
    name: "healthy",
    type: "gauge",
    help: "whether the videobridge is healthy",
  },
  total_bytes_sent: {
    name: "bytes_sent_total",
    type: "counter",
    help: "total number of bytes sent in RTP.",
  },
  mucs_configured: {
    name: "mucs_configured",
    type: "gauge",
    help: "Number of MUCs that are configured",
  },
  total_failed_conferences: {
    name: "failed_conferences_total",
    type: "counter",
    help:
      "total number of conferences in which no endpoints succeeded to establish an ICE connection.",
  },
  mucs_joined: {
    name: "mucs_joined",
    type: "gauge",
    help: "Number of MUCs that the videobridge has joined",
  },
  /*  relay_id: {
      name: "relay_id",
      type: "gauge",
      help: ""
    }*/
};

// The value is an array of integers of size 22, and the value at (zero-based) index i is the number of conferences with i participants. The last element (index 21) also includes conferences with more than 21 participants.
export const colibriMultisizeStatsMap: Record<
  string,
  { name: string; type: string; help: string; size: number }
> = {
  conference_sizes: {
    name: "conference_sizes",
    type: "gauge",
    help:
      "number of conferences with a defined number of participants. largest size also includes conferences with more participants",
    size: 22,
  },

  conferences_by_video_senders: {
    name: "conferences_by_video_senders",
    type: "gauge",
    help:
      "number of conferences with a defined number of participants who are sending video. largest size also includes conferences with more participants",
    size: 22,
  },

  conferences_by_audio_senders: {
    name: "conferences_by_audio_senders",
    type: "gauge",
    help:
      "number of conferences with a defined number of participants who are sending audio. largest size also includes conferences with more participants",
    size: 22,
  },
};
