import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AppleLogo from './AppleLogo';
import { getTheme } from '../theme';

export default function MobileFooter({ isDarkMode = true }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  const toggleSection = (idx) => {
    setExpandedSection(expandedSection === idx ? null : idx);
  };

  const directoryData = [
    {
      title: 'Shop and Learn',
      links: ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods', 'TV & Home', 'AirTag', 'Accessories', 'Gift Cards'],
    },
    {
      title: 'Apple Wallet',
      links: ['Wallet', 'Apple Card', 'Apple Pay', 'Apple Cash'],
    },
    {
      title: 'Account',
      links: ['Manage Your Apple ID', 'Apple Store Account', 'iCloud.com'],
    },
    {
      title: 'Entertainment',
      links: ['Apple One', 'Apple TV+', 'Apple Music', 'Apple Arcade', 'Apple Fitness+', 'Apple News+', 'Apple Podcasts', 'Apple Books', 'App Store'],
    },
    {
      title: 'Apple Store',
      links: ['Find a Store', 'Genius Bar', 'Today at Apple', 'Apple Camp', 'Apple Store App', 'Certified Refurbished', 'Apple Trade In', 'Financing', 'Carrier Deals at Apple', 'Order Status', 'Shopping Help'],
    },
    {
      title: 'About Apple',
      links: ['Newsroom', 'Apple Leadership', 'Career Opportunities', 'Investors', 'Ethics & Compliance', 'Events', 'Contact Apple'],
    },
  ];

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: isDarkMode ? '#0a0a0c' : '#f5f5f7',
          borderTopColor: colors.cardBorder,
        },
      ]}
    >
      {/* Footnotes */}
      <View style={styles.footnotesSection}>
        <Text style={[styles.footnoteText, { color: colors.secondaryLabel }]}>
          * Pricing includes a $30 connectivity discount that requires activation with AT&T, T-Mobile, or Verizon.
        </Text>
        <Text style={[styles.footnoteText, { color: colors.secondaryLabel }]}>
          ** Apple Card Monthly Installments (ACMI) is a 0% APR payment option available only in the U.S. to select at checkout for certain Apple products.
        </Text>
        <Text style={[styles.footnoteText, { color: colors.secondaryLabel }]}>
          1. Trade-in values will vary based on condition, year, and configuration of your eligible trade-in device.
        </Text>
      </View>

      {/* Breadcrumb row */}
      <View style={styles.breadcrumbArea}>
        <View style={styles.logoRow}>
          <AppleLogo size={14} color={isDarkMode ? '#a1a1a6' : '#1d1d1f'} />
        </View>
        <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
        <View style={styles.breadcrumb}>
          <Text style={[styles.separator, { color: colors.secondaryLabel }]}>›</Text>
          <Text style={[styles.breadcrumbText, { color: colors.label }]}>iPhone</Text>
        </View>
      </View>

      {/* Directory Accordion */}
      <View style={[styles.directoryAccordion, { borderTopColor: colors.cardBorder }]}>
        {directoryData.map((section, idx) => {
          const isExpanded = expandedSection === idx;
          return (
            <View
              key={section.title}
              style={[styles.accordionItem, { borderBottomColor: colors.cardBorder }]}
            >
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => toggleSection(idx)}
                activeOpacity={0.7}
              >
                <Text style={[styles.accordionTitle, { color: colors.label }]}>
                  {section.title}
                </Text>
                <Text style={[styles.accordionIcon, { color: colors.secondaryLabel }]}>
                  {isExpanded ? '−' : '+'}
                </Text>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.accordionContent}>
                  {section.links.map((link) => (
                    <TouchableOpacity key={link} activeOpacity={0.7}>
                      <Text style={[styles.accordionLink, { color: colors.secondaryLabel }]}>
                        {link}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Copyright & Legal */}
      <View style={styles.legalSection}>
        <Text style={[styles.shopHelp, { color: colors.secondaryLabel }]}>
          More ways to shop: Visit an Apple Store, call 1-800-MY-APPLE, or find a reseller.
        </Text>
        <Text style={[styles.copyright, { color: colors.secondaryLabel }]}>
          Copyright © 2026 Apple Inc. All rights reserved.
        </Text>
        <View style={styles.legalLinksRow}>
          {['Privacy Policy', 'Terms of Use', 'Sales and Refunds', 'Legal', 'Site Map'].map(
            (item, index) => (
              <React.Fragment key={item}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={[styles.legalLink, { color: colors.secondaryLabel }]}>{item}</Text>
                </TouchableOpacity>
                {index < 4 && (
                  <Text style={[styles.legalDot, { color: colors.cardBorder }]}>|</Text>
                )}
              </React.Fragment>
            )
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    width: '100%',
  },
  footnotesSection: {
    paddingBottom: 16,
    gap: 8,
  },
  footnoteText: {
    fontSize: 10.5,
    lineHeight: 14,
  },
  breadcrumbArea: {
    paddingVertical: 10,
    gap: 4,
  },
  logoRow: {
    paddingVertical: 2,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  separator: {
    fontSize: 14,
  },
  breadcrumbText: {
    fontSize: 12,
    fontWeight: '500',
  },
  directoryAccordion: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  accordionItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  accordionTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  accordionIcon: {
    fontSize: 14,
    fontWeight: '600',
  },
  accordionContent: {
    paddingBottom: 12,
    gap: 8,
  },
  accordionLink: {
    fontSize: 11.5,
  },
  legalSection: {
    paddingTop: 16,
    gap: 8,
  },
  shopHelp: {
    fontSize: 11,
    lineHeight: 15,
  },
  copyright: {
    fontSize: 10.5,
  },
  legalLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  legalLink: {
    fontSize: 10.5,
  },
  legalDot: {
    fontSize: 10.5,
  },
});
