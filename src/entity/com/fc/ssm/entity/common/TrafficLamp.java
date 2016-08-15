package com.fc.ssm.entity.common;

public enum TrafficLamp {
	RED {
		@Override
		public TrafficLamp nextLamp() {
			return GREEN;
		}
	},GREEN {
		@Override
		public TrafficLamp nextLamp() {
			return YELLOW;
		}
	},YELLOW {
		@Override
		public TrafficLamp nextLamp() {
			return RED;
		}
	};
	public abstract TrafficLamp nextLamp();
}
